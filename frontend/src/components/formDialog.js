import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from '@/styles/postDialog.module.css';

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
        <div className={styles.dialogContainer}>
          <h3 className={styles.dialogTitle}>Create Post</h3>
          <DialogContent className={styles.dialogContent}>
            <form onSubmit={(e) => addChild(e)}>
              <div className={styles.inputContainer}>
                <label htmlFor="departLoc">Depart. Location:</label>
                <input type="text" id="departLoc" name="departLoc" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="dest">Destination:</label>
                <input type="text" id="dest" name="dest" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="departDate">Depart. Date:</label>
                <input type="text" id="departDate" name="departDate" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="departTime">Depart. Time:</label>
                <input type="text" id="departTime" name="departTime" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="flightTime">Flight Time:</label>
                <input type="text" id="flightTime" name="flightTime" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="flightNumber">Flight Number:</label>
                <input type="text" id="flightNumber" name="flightNumber" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="flightDest">Flight Dest.:</label>
                <input type="text" id="flightDest" name="flightDest" required />
              </div>
              <div className={styles.inputContainer}>
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
                  </Select>
                </FormControl>
              </div>
              <div className={styles.buttonContainer}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Publish</Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
