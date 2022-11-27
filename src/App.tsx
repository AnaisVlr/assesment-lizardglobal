import FilteredPostsComponent from './components/FilteredPostsComponent';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
      <Typography variant="h4">
        Welcome to my posts page!
      </Typography>
      <FilteredPostsComponent></FilteredPostsComponent>
    </>
  );
}

export default App;
