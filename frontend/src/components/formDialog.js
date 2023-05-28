import * as React from 'react';
//import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
//import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
//import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
//import IconButton from '@mui/material/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
//import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from "@/styles/postDialog.module.css";

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedNumber, setSelectedNumber] = React.useState('');

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Create Post
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent >
            <h3>Create Post</h3>
            <form onSubmit={(e) => addChild(e)}>
              Depart. Location:
              <input type="text" name="departLoc" required />
              <br />
              Destination:
              <input type="text" name="dest" required />
              <br />
              Depart. Date:
              <input type="text" name="departDate" required />
              <br />
              Depart. Time:
              <input type="text" name="departTime" required />
              <br />
              Flight Time:
              <input type="text" name="flightTime" required />
              <br />
              Flight Number:
              <input type="text" name="flightNumber" required />
              <br />
              Flight Dest.:
              <input type="text" name="flightDest" required />
              <br />
              <label htmlFor="number">Group Size (including you):</label>
              <FormControl>
                <Select value={selectedNumber} onChange={handleNumberChange}>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                {/* Add more MenuItems with desired numbers */}
                </Select>
              </FormControl>
              <br />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Publish</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
  );
}
