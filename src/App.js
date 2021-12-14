import { makeStyles } from '@mui/styles';
import { IconButton, MenuItem, Menu, Divider, Fade } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DoneIcon from '@mui/icons-material/Done';
import * as data from "./data.json";
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { formatFileSize } from "./utils";
import moment from "moment";
import FileIcon from "./FileIcon";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    padding: "1%",
    border: "1px solid #d3d1d1",
    margin: "6%"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
  },
  sortingArea: {
    display: "flex",
    justifyItems: "center",
    backgroundColor: "#efeeee",
    alignItems: "center",
    height: 45
  },
  nameArea: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      backgroundColor: "#dbdbdb",
    },
  },
  timeArea: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      backgroundColor: "#dbdbdb",
    },
  },
  sizeArea: {
    width: "25%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      backgroundColor: "#dbdbdb",
    },
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between"
  },
  sortIcon: {
    color: "grey",
    marginRight: 10
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: window.innerWidth > 450 ? "repeat(5, 1fr)" : "repeat(2, 1fr)",
    justifyItems: "center",
    height: "100%"
  },
  listView: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    padding: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F8F8F8",
    },
  },
  gridView: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F8F8F8",
      border: "0.5px solid #F8F8F8"
    },
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  }
});

const App = () => {
  const classes = useStyles();

  const [files, setFiles] = useState(data.files);
  const [view, setView] = useState("icon");
  const [nameSort, setNameSort] = useState("");
  const [timeSort, setTimeSort] = useState("");
  const [sizeSort, setSizeSort] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedFile, setSelectedFile] = useState({});

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSortByName = () => {
    setTimeSort("");
    setSizeSort("");
    if (nameSort === "up" || nameSort === "") {
      setFiles([...files].sort((a, b) => a.name.localeCompare(b.name)));
      setNameSort("down");
    }
    if (nameSort === "down") {
      setFiles([...files].sort((a, b) => b.name.localeCompare(a.name)));
      setNameSort("up");
    }
  };

  const handleSortByTime = () => {
    setNameSort("");
    setSizeSort("");
    if (timeSort === "up" || timeSort === "") {
      setFiles([...files].sort((a, b) => moment(a.modifiedAt).diff(moment(b.modifiedAt))));
      setTimeSort("down");
    }
    if (timeSort === "down") {
      setFiles([...files].sort((a, b) => moment(b.modifiedAt).diff(moment(a.modifiedAt))));
      setTimeSort("up");
    }
  };

  const handleSortBySize = () => {
    setNameSort("");
    setTimeSort("");
    if (sizeSort === "up" || sizeSort === "") {
      setFiles([...files].sort((a, b) => a.size - b.size));
      setSizeSort("down");
    }
    if (sizeSort === "down") {
      setFiles([...files].sort((a, b) => b.size - a.size));
      setSizeSort("up");
    }

  };

  return (
    <div className={classes.root} >
      <div className={classes.topBar} >
        <p style={{ color: "#9C9C9C" }} >Files</p>
        <IconButton
          onClick={handleOpenMenu}
        >
          <GridViewIcon />
        </IconButton>
        <Menu
          id="viewMenu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
        >
          <MenuItem
            id='icon'
            onClick={() => {
              setView("icon");
              handleCloseMenu();
            }}
          >
            <GridViewIcon />
            Large Icons
            {view === "icon" && <DoneIcon style={{ color: "lightblue", marginLeft: 5 }} />}
          </MenuItem>
          <MenuItem
            id='list'
            onClick={() => {
              setView("list");
              handleCloseMenu();
            }}
          >
            <ListIcon />
            Details
            {view === "list" && <DoneIcon style={{ color: "lightblue", marginLeft: 5 }} />}
          </MenuItem>
        </Menu>
      </div>
      <Divider />
      {(view === "list" && files.length > 0) && (
        <div style={selectedFile.name ? { width: "80%" } : { width: "100%" }} className={classes.sortingArea} >
          <div style={{ width: "10%", textAlign: "center" }} >
            <FolderIcon style={{ color: "grey" }} />
          </div>
          <div
            className={classes.nameArea}
            onClick={handleSortByName}
          >
            Name
            {nameSort === "up" ? (
              <ArrowUpwardIcon className={classes.sortIcon} />
            ) : [
              nameSort === "down" &&
              <ArrowDownwardIcon className={classes.sortIcon} />
            ]}
          </div>
          <div
            className={classes.timeArea}
            onClick={handleSortByTime}
          >
            Modified
            {timeSort === "up" ? (
              <ArrowUpwardIcon className={classes.sortIcon} />
            ) : [
              timeSort === "down" &&
              <ArrowDownwardIcon className={classes.sortIcon} />
            ]}
          </div>
          <div
            className={classes.sizeArea}
            onClick={handleSortBySize}
          >
            Size
            {sizeSort === "up" ? (
              <ArrowUpwardIcon className={classes.sortIcon} />
            ) : [
              sizeSort === "down" &&
              <ArrowDownwardIcon className={classes.sortIcon} />
            ]}
          </div>
        </div>
      )}
      <div className={classes.fileList} >
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }} >
          <div style={selectedFile.name ? { width: "80%" } : { width: "100%" }} >
            {files?.length === 0 ? (
              <p>There is no file</p>
            ) : (
              <div className={view === "icon" ? classes.gridContainer : undefined} >
                {files.map((item) =>
                  view === "list" ?
                    (
                      <div
                        className={classes.listView}
                        onClick={() => {
                          setSelectedFile(item);
                        }}
                      >
                        <span style={{ width: "10%", textAlign: "center" }} >
                          <FileIcon extension={item.extension} />
                        </span>
                        <span style={{ width: "50%" }}>{item.name}</span>
                        <span style={{ width: "25%" }}>{moment(item.modifiedAt).format("MMMM DD, YYYY HH:mm")}</span>
                        <span style={{ width: "25%" }}>{formatFileSize(item.size)}</span>
                      </div>
                    ) : (
                      <div
                        className={classes.gridView}
                        onClick={() => {
                          setSelectedFile(item);
                        }}
                      >
                        <span>
                          <FileIcon grid={true} extension={item.extension} />
                        </span>
                        <span>{item.name}</span>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
          {selectedFile.name && <Divider style={{ height: "auto", border: "1px solid #d3d1d1" }} orientation='vertical' />}
          {selectedFile.name && (
            <Fade in={selectedFile?.name}>
              <div style={view === "list" ? { width: "18%", textAlign: "end", marginTop: -40, } : { width: "18%", textAlign: "end", marginTop: 5 }} >
                <div style={{ display: "flex", justifyContent: "space-between" }} >
                  <CloseIcon style={{ cursor: "pointer" }} onClick={() => {
                    setSelectedFile({});
                  }} />
                  <FileIcon grid={"icon"} extension={selectedFile?.extension} />
                </div>
                <p style={{ color: "grey" }} >File Name: </p>{selectedFile.name}
                <p style={{ color: "grey" }}>File Size: </p>{formatFileSize(selectedFile.size)}
                <p style={{ color: "grey" }}>Modified At: </p>{moment(selectedFile.modifiedAt).format("MMMM DD, YYYY HH:mm")}
                <p style={{ color: "grey" }}>Modified by: </p>{selectedFile.modifiedBy}
              </div>
            </Fade>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
