import { server } from "./mocks/browser";
import { beforeAll, afterAll, afterEach } from "@jest/globals";

beforeAll(() => {
  console.log("Starting MSW....");
  server.listen({ onUnhandledRequest: "warn" });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
