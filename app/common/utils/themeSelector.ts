import { Theme } from '@material-ui/core';

interface IProps {
  theme: Theme;
}

export const themeSelector = {
  primaryMain: (props: IProps) => props.theme.palette.primary.main,
  contrastText: (props: IProps) => props.theme.palette.primary.contrastText,
};
