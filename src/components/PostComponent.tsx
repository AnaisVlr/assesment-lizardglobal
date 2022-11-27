import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Moment from 'react-moment';
import Post from '../models/Post';

function PostComponent(props :{post: Post}) {
    const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));


    return(
        <div className='post'>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar alt={props.post.author.name} src={props.post.author.avatar}/>
                    }
                    title={props.post.title}
                    subheader={
                        <Moment format="YYYY/MM/DD" date={props.post.publishDate}></Moment>
                    }
                />
                <CardContent>
                    <Typography variant="body2">
                        Summary :
                        {props.post.summary}
                    </Typography>
                    <Typography variant="body2">
                        Categories :
                    </Typography>
                    <Grid container>
                            {props.post.categories.map((category) => (
                                <Grid item key={category.id + category.name} >
                                    <Item>{category.name}</Item>
                                </Grid>
                            ))}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostComponent;