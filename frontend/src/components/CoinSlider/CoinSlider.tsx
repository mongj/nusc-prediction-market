import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: '#007bff',
  height: 5,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: 0,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
      ...theme.applyStyles('dark', {
        color: '#fff',
      }),
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 5,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#d0d0d0',
  },
  ...theme.applyStyles('dark', {
    color: '#0a84ff',
  }),
}));


export default function CustomizedSlider({ value, onChange }) {
  return (
    <Box sx={{ width: 320 }}>
      <IOSSlider
        aria-label="ios slider"
        defaultValue={1}
        value={value}
        onChange={onChange}
        valueLabelDisplay="on"
        min={1}
        max={20}
      />
    </Box>
  );
}
