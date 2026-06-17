import { describe, it, expect } from "vitest";
import { tokenize } from "./rsvp";

describe("tokenize — hyphen serialization", () => {
  it("splits an internal-hyphen compound, hyphen trailing each lead piece", () => {
    expect(tokenize("jack-of-all-trades")).toEqual(["jack-", "of-", "all-", "trades"]);
  });
  it("leaves plain words alone", () => {
    expect(tokenize("hello world")).toEqual(["hello", "world"]);
  });
  it("keeps a trailing hyphen attached", () => {
    expect(tokenize("well-")).toEqual(["well-"]);
  });
  it("keeps a leading hyphen attached", () => {
    expect(tokenize("-thing")).toEqual(["-thing"]);
  });
  it("handles a two-part compound", () => {
    expect(tokenize("e-mail")).toEqual(["e-", "mail"]);
  });
  it("handles a numeric range", () => {
    expect(tokenize("2020-2021")).toEqual(["2020-", "2021"]);
  });
  it("does not split a double hyphen", () => {
    expect(tokenize("a--b")).toEqual(["a--b"]);
  });
  it("splits only the hyphenated token within a sentence", () => {
    expect(tokenize("a self-made man.")).toEqual(["a", "self-", "made", "man."]);
  });
  it("collapses surrounding whitespace", () => {
    expect(tokenize("  one   two  ")).toEqual(["one", "two"]);
  });
});
