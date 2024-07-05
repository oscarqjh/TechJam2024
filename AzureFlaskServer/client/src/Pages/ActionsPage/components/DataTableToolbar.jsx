"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";
import ActionForm from "./ActionForm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
// import { priorities, statuses } from "../data/data";
// import CloseIcon from "@mui/icons-material/Close";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";

export function DataTableToolbar({ table, databases, type }) {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const db_processed = []
  if (type == "Actions") {
    for (const db of databases) {
      db_processed.push({value: db, label: db})
    }
  }

  
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={type == "Actions" ? "Filter actions..." : "Filter databases"}
          value={type == "Actions" ? table.getColumn("action")?.getFilterValue() ?? "" : type == "Databases" ? table.getColumn("db_name")?.getFilterValue() ?? "" : ""}
          onChange={(event) =>
            type == "Actions" ? table.getColumn("action")?.setFilterValue(event.target.value) : type == "Databases" ? table.getColumn("db_name")?.setFilterValue(event.target.value) : ""
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {type == "Actions" && table.getColumn("action_type") && (
          <DataTableFacetedFilter
            column={table.getColumn("action_type")}
            title="Status"
            options={[{value: "Query", label: "Query"}, {value: "API", label: "API"}]}
          />
        )}
        {type == "Actions" && table.getColumn("database") && (
          <DataTableFacetedFilter
            column={table.getColumn("database")}
            title="Database"
            options={db_processed}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div>
        <Button
          size="sm"
          className="ml-auto hidden h-8 lg:flex mr-2"
          onClick={handleOpen}
        >
          Add Action
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography
              variant="h6"
              align="center"
              component="div"
              fontWeight="Bold"
            >
              Create an Action
            </Typography>
          </DialogTitle>
          <DialogContent>
            <ActionForm onClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
