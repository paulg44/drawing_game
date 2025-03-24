// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {
  TextEncoder as ImportedTextEncoder,
  TextDecoder as ImportedTextDecoder,
  // TransformStream as ImportedTransformStream,
} from "util";
import { server } from "./mocks/server";

Object.assign(global, {
  TextDecoder: ImportedTextDecoder,
  TextEncoder: ImportedTextEncoder,
  // TransformStream: ImportedTransformStream,
});

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
