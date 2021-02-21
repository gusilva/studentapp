import React, { useState } from "react";
import { AppBar, IconButton, InputBase, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useStyles } from "./nav.presets";

interface NavProps {
  onAdd: () => void;
  search?: (value: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onAdd, search }: NavProps) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    setValue(data);
    search && search(data);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Student App
          </Typography>
          <IconButton
            onClick={onAdd}
            color="secondary"
            aria-label="add"
            className={classes.addButton}
          >
            <PersonAddIcon />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by student name…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={value}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
