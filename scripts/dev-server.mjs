/**
 * Offline development server.
 *
 * The sandbox used to build this project blocks Node child-process spawning, which is
 * how the `next dev` and `next build` CLIs start their workers. Starting Next's server
 * programmatically keeps everything in a single process, so the site can still be
 * rendered and checked against real SSR output.
 *
 * Usage: node scripts/dev-server.mjs [port]
 */
const port = Number.parseInt(process.argv[2] ?? "4321", 10);
const hostname = "127.0.0.1";

process.env.NODE_ENV = "development";
process.env.TURBOPACK = "1";
process.env.__NEXT_DEV_SERVER = "1";
process.env.NEXT_PRIVATE_WORKER = "1";

const { startServer } = await import("next/dist/server/lib/start-server.js");

const server = await startServer({
  dir: process.cwd(),
  isDev: true,
  port,
  hostname,
  allowRetry: false,
});

const address = server?.address?.();
const resolvedPort = typeof address === "object" && address ? address.port : port;

console.log(`[dev-server] ready on http://${hostname}:${resolvedPort}`);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await server?.close?.();
    process.exit(0);
  });
}
