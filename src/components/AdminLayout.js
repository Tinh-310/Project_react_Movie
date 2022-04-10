import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Outlet, NavLink } from "react-router-dom";

function AdminLayout() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="md">
            <NavLink to="/admin/movies">Movies</NavLink>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <NavLink to="/admin/users">Users</NavLink>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <span>Cybersoft Movie</span>
        </Header>
      }
    >
      {/* Render child route */}
      <Outlet />
    </AppShell>
  );
}

export default AdminLayout;
