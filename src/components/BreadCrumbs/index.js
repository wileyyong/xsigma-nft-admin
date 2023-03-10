import React from 'react'
import Widget from '../Widget'
import { Link } from 'react-router-dom'
import {
    Box,
    Grid,
    Breadcrumbs,
    Tabs,
    Tab,
} from '@material-ui/core'
import moment from 'moment';
import { Typography } from '../Wrappers'
import {
    NavigateNext as NavigateNextIcon,
    CalendarToday as CalendarIcon,
} from '@material-ui/icons'
import { useLocation } from 'react-router-dom';
import { withStyles } from '@material-ui/styles'

// styles
import useStyles from '../Layout/styles'

// components

import { useLayoutState } from '../../context/LayoutContext'
import structure from '../Sidebar/SidebarStructure'
//Sidebar structure

// Tab styling

const CustomTab = withStyles(theme => ({
    root: {
        minWidth: 72,
        textTransform: 'none',
        fontWeight: 400,
    },
}))(props => <Tab {...props} />)
//Sidebar structure


const BreadCrumbs = () => {
  const location = useLocation()
  const classes = useStyles()
  const [value, setValue] = React.useState(2)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)
  // eslint-disable-next-line no-unused-vars
  const id = open ? 'add-section-popover' : undefined
  // eslint-disable-next-line no-unused-vars
  const handleClick = event => {
      setAnchorEl(open ? null : event.currentTarget)
  }

  const renderBreadCrumbs = () => {
    let url = location.pathname;
    let route = url.split('/')
    .slice(1)
    .map(route => route
      .split('-')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
    );
    const length = route.length;
    return route.map((item,index) => {
      let middlewareUrl = "/" + url.split('/').slice(1, index + 2).join('/');
      
      return (
        <Breadcrumbs
          key={index + '_b'}
          separator={
              <NavigateNextIcon fontSize="small" />
          }
          aria-label="breadcrumb"
        >
          <Typography variant="h6"color={length === index + 1 ? "primary" : ""}>
            {length === index + 1 ?
              item : 
              <Link to={middlewareUrl} style={{ color: 'unset', textDecoration: 'none' }}>
                {item}
              </Link>
            }
          </Typography>
        </Breadcrumbs>
      )
    })
  }


  // global
  // eslint-disable-next-line no-unused-vars
  const layoutState = useLayoutState();

  const handleChange = (event, newValue) => {
      setValue(newValue)
  }

  function a11yProps(index) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      }
  }
  return (
    <Widget
      disableWidgetMenu
      inheritHeight
      className={classes.margin}
      bodyClass={classes.navPadding}
    >
      <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          wrap={'wrap'}
          style={{ overflowX: 'auto' }}
      >

          {// eslint-disable-next-line
            structure.map(c => {
              if (
                  window.location.hash.includes(c.link) &&
                  c.link && c.label === "Dashboard"
              ) {
                  return (
                      <Box
                          display="flex"
                          alignItems="center"
                          key={c.id}
                      >
                          <Breadcrumbs aria-label="breadcrumb">
                              <Typography variant="h4">
                                  {c.label}
                              </Typography>
                          </Breadcrumbs>
                          {window.location.hash.includes(
                              '/app/dashboard'
                          ) && (
                              <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  aria-label="simple tabs example"
                                  variant="scrollable"
                                  scrollButtons="auto"
                                  style={{ marginLeft: 38 }}
                              >
                                  <CustomTab
                                      label="Today"
                                      {...a11yProps(0)}
                                  />
                                  <CustomTab
                                      label="This week"
                                      {...a11yProps(1)}
                                  />
                                  <CustomTab
                                      label="This month"
                                      {...a11yProps(2)}
                                  />
                                  <CustomTab
                                      label="This year"
                                      {...a11yProps(3)}
                                  />
                              </Tabs>
                          )}
                      </Box>
                  )
              }
          })}
          {window.location.hash.includes('/app/dashboard') ? (
              <Box display="flex" alignItems="center">
                  <CalendarIcon
                      className={classes.calendarIcon}
                  />
                  <Typography className={classes.date} style={{marginRight: 38}}>
                    {
                        moment(new Date()).format('DD MMM YYYY, ddd')
                    }
                  </Typography>
                  {/* <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                  >
                      Latest Reports
                  </Button> */}
              </Box>
          ) : (
            <Breadcrumbs
                separator={
                  <NavigateNextIcon fontSize="small" />
              }
              aria-label="breadcrumb"
            >
              {renderBreadCrumbs()}
            </Breadcrumbs>            
          )}
      </Grid>
  </Widget>
  
  )
}
export default BreadCrumbs
