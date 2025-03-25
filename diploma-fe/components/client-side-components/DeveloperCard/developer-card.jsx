"use client"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export function DeveloperCard({developer}) {
    return (
        <Card sx={{width: 300}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={developer.image}
                    alt="Developer image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {developer.name}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {developer.skills.join(", ")}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        The Rating is {developer.rating}.0
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );



}
