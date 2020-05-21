import { Theme } from '@material-ui/core';

interface IProps {
  theme: Theme;
}

export const themeSelector = {
  primaryMain: (props: IProps) => props.theme.palette.primary.main,
  textContrast: (props: IProps) => props.theme.palette.primary.contrastText,
  textPrimary: (props: IProps) => props.theme.palette.text.primary,
  background: (props: IProps) => props.theme.palette.grey['800'],
};
