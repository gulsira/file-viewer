import React from "react";
import { makeStyles } from '@mui/styles';
import Docx from "./images/docx.png";
import Jpeg from "./images/jpeg.png";
import Pdf from "./images/pdf.png";
import Txt from "./images/txt.png";

const useStyles = makeStyles({
    image: {
        width: 30,
        height: 30
    }
});

const FileIcon = ({ extension, grid }) => {

    const classes = useStyles();

    if (extension === ".docx")
        return (
            <img alt="icon" className={classes.image} style={grid ? { width: 60, height: 60 } : undefined} src={Docx} />
        )
    else if (extension === ".jpeg")
        return (
            <img alt="icon" className={classes.image} style={grid ? { width: 60, height: 60 } : undefined} src={Jpeg} />
        )
    else if (extension === ".pdf")
        return (
            <img alt="icon" className={classes.image} style={grid ? { width: 60, height: 60 } : undefined} src={Pdf} />
        )
    else if (extension === ".txt")
        return (
            <img alt="icon" className={classes.image} style={grid ? { width: 60, height: 60 } : undefined} src={Txt} />
        )
    else return <div></div>

}

export default FileIcon;