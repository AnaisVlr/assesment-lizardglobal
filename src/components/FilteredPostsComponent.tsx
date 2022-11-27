import React,{useState, useMemo, useEffect} from 'react';
import PaginatedPostsComponent from './PaginatedPostsComponent';
import Typography from '@mui/material/Typography';
import Post from '../models/Post';
import Category from '../models/Category';
import axios, {AxiosError} from 'axios';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';


function FilteredPostsComponent() {
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  //Function to retrieve and instantiate posts
  useEffect(() => {
    axios.get<{posts : Post[]}>("http://localhost:3000/api/posts")
      .then(res => { 
        setIsLoaded(true);
        setPosts(res.data.posts);
      })
      .catch((error : AxiosError) => {
        setIsLoaded(true);
        setError(error);
      })
  }, []);

  //---------------------FILTER---------------------
  //Template for filter
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  //The categories selected by the user
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  //The list of all possible categories
  const categoryOptions : string[] = [
    'All',
    'Email Marketing',
    'Ecommerce',
    'Marketing Automation',
    'Landing Pages',
    'Marketing Analytics',
    'Data Management',
    'MSurveys and Forms',
    'Tips and Best Practise',
    'Digital Marketing',
    'Platform News and Updates'
  ]

  //
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  //Function to handle the change in the selected categories
  const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  //Function to get filtered list
  function getFilteredList() {
      // Avoid filter when selectedCategory is null
      console.log(selectedCategories);
      if (selectedCategories == null || selectedCategories.length === 0) {
        return posts;
      }
      //Filter to select only the posts that have the selected category or categories
      return posts.filter(post => post.categories.some(checkCategories));
  }

  //Function to check if the post has the selected category
  function checkCategories(category : Category) {
    //If the selected category is "All", the result is necessarily true.
    if(selectedCategories.some(selectedCategory => selectedCategory === "All")) {
      return true;
    }
    //We check if the category of the post is in the list of selected categories
    return selectedCategories.some(selectedCategory => selectedCategory === category.name);
  }

  //Avoid duplicate function calls with useMemo
  const filteredList : Post[] = useMemo(getFilteredList, [selectedCategories, posts]);
  
  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="app">
        <div className="filter-container">
          <div>
            <Typography variant="body2">
              Select one or more categories to filter the posts
            </Typography>
            <FormControl sx={{ m: 1, width: 340}}>
            <InputLabel id="category-filter">Categories</InputLabel>
              <Select
                labelId="category-filter"
                id="category-filter"
                multiple
                value={selectedCategories}
                onChange={handleChange}
                input={<OutlinedInput id="category-filter" label="Categories" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categoryOptions.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    style={getStyles(category, selectedCategories, theme)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <PaginatedPostsComponent posts={filteredList}/>
        </div>
      </div>
    );
  }
}

export default FilteredPostsComponent;