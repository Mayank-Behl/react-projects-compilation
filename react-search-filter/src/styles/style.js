import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  searchContainer: {
    backgroundColor: "#f2f2f2",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: theme.spacing(2),
  },
  input: {
    flex: 1,
  },
}));
