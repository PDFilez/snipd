import React from "react";
import { Button, Group, Stack, Divider, Title, AppShell } from "@mantine/core";

export const ShowAllSnippets = (props) => {
  return (
    <Button
      variant="outline"
      color="error"
      onClick={() => {
        props.setFilterState({...props.filterState, selectedCategory: "", selectedType: ""} )
      }}>
      Show all snipds
    </Button>
  );
};
