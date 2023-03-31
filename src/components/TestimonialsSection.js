import React from 'react'
import useClasses from '../hooks/useClasses'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Section from './Section'
import SectionHeader from './SectionHeader'

const styles = theme => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
});

function TestimonialsSection(props) {

  const classes = useClasses(styles)
  const items = [
    {
      avatar: 'https://uploads.divjoy.com/pravatar-150x-5.jpeg',
      name: 'Sarah Kline',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
      company: 'Company',
    },
    {
      avatar: 'https://uploads.divjoy.com/pravatar-150x-48.jpeg',
      name: 'Shawna Murray',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!',
      company: 'Company',
    },
    {
      avatar: 'https://uploads.divjoy.com/pravatar-150x-12.jpeg',
      name: 'Blake Elder',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae.',
      company: 'Company',
    },
  ]

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} sm={4} key={index}>
              <Card>
                <Box display="flex" justifyContent="center" pt={3}>
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    className={classes.avatar}
                  />
                </Box>
                <CardContent>
                  <Box textAlign="center">
                    <Typography variant="body1" component="p">
                      "{item.testimonial}"
                    </Typography>
                    <Box mt={3}>
                      <Typography variant="body2" component="p">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TestimonialsSection
