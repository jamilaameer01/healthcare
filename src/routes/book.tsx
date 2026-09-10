import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The appointment-request form now lives on the contact page, alongside the
 * address, hours and directions people were leaving this page to find.
 *
 * The route is kept as a redirect rather than deleted: `/book` has been linked
 * and printed, so removing it outright would 404 anyone arriving from an old
 * link. `replace` keeps it out of the back-button history.
 */
export const Route = createFileRoute("/book")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", replace: true });
  },
});
