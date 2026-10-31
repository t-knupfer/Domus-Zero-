"""Validate the built site against content captured before the ten-page migration.

Run after building: DOMUS_BUILD_DIR=/path/to/public python3 -m unittest discover -s tests -p test_migration.py
Uses Python's standard library only.
"""
import json
import os
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
BUILD = Path(os.environ.get("DOMUS_BUILD_DIR", ROOT / "public"))
BASELINE = json.loads((ROOT / "tests/fixtures/migration-baseline.json").read_text())
CLIENT = json.loads((ROOT / "src/_data/client.json").read_text())


def normalize(value):
    # Only approved wording difference: U.S. English "handoff" replaces "handover".
    return re.sub(r"\bhandover\b", "handoff", " ".join(value.split()).casefold())


class Page(HTMLParser):
    def __init__(self, content):
        super().__init__(convert_charrefs=True)
        self.main_text = []
        self.in_main = False
        self.lang = None
        self.links = []
        self.images = []
        self.scripts = []
        self.canonical = None
        self.alternates = {}
        self.description = None
        self.forms = 0
        self.h1 = 0
        self.ids = []
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "main":
            self.in_main = True
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "h1":
            self.h1 += 1
        if tag == "form":
            self.forms += 1
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "img":
            self.images.append(attrs.get("src", ""))
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
        if tag == "meta" and attrs.get("name") == "description":
            self.description = attrs.get("content")
        if tag == "link":
            if attrs.get("rel") == "canonical":
                self.canonical = attrs.get("href")
            if attrs.get("rel") == "alternate":
                self.alternates[attrs["hreflang"]] = attrs["href"]

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False

    def handle_data(self, text):
        if self.in_main:
            self.main_text.append(text)


class MigrationTests(unittest.TestCase):
    def load_page(self, record):
        path = BUILD / record["url"].lstrip("/") / "index.html"
        self.assertTrue(path.is_file(), str(path))
        return Page(path.read_text())

    def test_all_ten_pages_preserve_existing_content(self):
        self.assertEqual(len(BASELINE), 10)
        for record in BASELINE:
            with self.subTest(url=record["url"]):
                page = self.load_page(record)
                body = normalize(" ".join(page.main_text))
                for text in record["expectedText"]:
                    self.assertIn(normalize(text), body, text)
                for target in record["internalTargets"]:
                    self.assertIn(target, page.links)
                if record["hasContactCTA"]:
                    target = "/contatto/" if record["language"] == "it" else "/en/contact/"
                    self.assertIn(target, page.links)
                    self.assertIn("cta-262", page.ids)
                self.assertEqual(page.h1, 1)
                self.assertEqual(len(page.ids), len(set(page.ids)), "Duplicate IDs")
                self.assertEqual(page.forms, 0)

    def test_metadata_and_language_pairs(self):
        for record in BASELINE:
            with self.subTest(url=record["url"]):
                page = self.load_page(record)
                own_lang = "it" if record["language"] == "it" else "en-US"
                other_lang = "en-US" if own_lang == "it" else "it"
                self.assertEqual(page.lang, own_lang)
                self.assertEqual(page.canonical, CLIENT["domain"] + record["url"])
                self.assertEqual(normalize(page.description), normalize(record["description"]))
                self.assertEqual(page.alternates[own_lang], page.canonical)
                self.assertEqual(page.alternates[other_lang], CLIENT["domain"] + record["alternate"])
                self.assertIn(record["alternate"], page.links)

    def test_local_assets_and_internal_link_targets(self):
        for record in BASELINE:
            with self.subTest(url=record["url"]):
                page = self.load_page(record)
                self.assertIn("/assets/js/redesign-navigation.js", page.scripts)
                manifest = json.loads((ROOT / "src/assets/images/display/manifest.json").read_text())
                allowed_images = {"/assets/images/display/" + image["file"] for image in manifest}
                allowed_images.update({"/assets/images/tempAddOns/DZ-logo.jpeg", "/assets/svgs/gb.svg", "/assets/svgs/it.svg"})
                for image in page.images:
                    self.assertIn(image, allowed_images, "Unapproved or superseded photograph")
                for asset in page.images + page.scripts:
                    self.assertTrue(asset.startswith("/"), "Unexpected remote dependency: " + asset)
                    self.assertTrue((BUILD / unquote(urlsplit(asset).path).lstrip("/")).is_file(), asset)
                for link in page.links:
                    if link.startswith("/"):
                        path = BUILD / unquote(urlsplit(link).path).lstrip("/")
                        self.assertTrue(path.is_file() or (path / "index.html").is_file(), link)
                        self.assertFalse(link.startswith("/design-system/"), "Migration links must use the real site URLs")

    def test_contact_details_and_existing_redirects(self):
        for record in BASELINE:
            if record["kind"] == "contact":
                page = self.load_page(record)
                body = " ".join(page.main_text)
                self.assertIn(CLIENT["email"], body)
                self.assertIn(CLIENT["phonePrimaryFormatted"], body)
                self.assertIn("Domus Zero", body)
                self.assertIn("Firenze FI Italy", body)
                self.assertNotIn(CLIENT["address"]["lineThree"], body)
                self.assertNotIn(CLIENT["address"]["mapLink"], page.links)
                self.assertIn("mailto:" + CLIENT["email"], page.links)
                self.assertIn("tel:" + CLIENT["phonePrimaryForTel"].replace(" ", ""), page.links)
        self.assertEqual((BUILD / "_redirects").read_text(), (ROOT / "src/_redirects").read_text())
        sitemap = (BUILD / "sitemap.xml").read_text()
        self.assertNotIn("/design-system/", sitemap)
        for record in BASELINE:
            self.assertIn(CLIENT["domain"] + record["url"], sitemap)


if __name__ == "__main__":
    unittest.main()
