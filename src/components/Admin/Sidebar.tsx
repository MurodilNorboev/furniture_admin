import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from './utils';
import { Navlink } from '../styles/link';
import { useNavigate } from 'react-router-dom';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

export const ItemData = [
  {
    id: 1,
    a: 'Dashboard',
    icon: <DashboardRoundedIcon />,
    to: '/home', 
  },
  {
    id: 2,
    a: 'Orders',
    icon: <ShoppingCartRoundedIcon />,
    to: '/orders',  
  },
  {
    id: 3,
    a: 'Product',
    icon: <AssignmentRoundedIcon />,
    to: '/categorie', 
  },
  {
    id: 4,
    a: 'Users',
    icon: <GroupRoundedIcon />,
    to: '/user', 
  },
  // {
  //   id: 5,
  //   a: 'Messages',
  //   icon: <QuestionAnswerRoundedIcon />,
  //   to: '/messages', 
  // },
];


export default function Sidebar() {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const navigate = useNavigate();

const handleClick = (item: { a: string; to: string }) => {
  navigate(item.to, { state: { title: item.a } });
};

  const logaut = () => {
    localStorage.clear();
    navigate('/login')
  }


  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '220px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Furniture</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >

      <List
      size="sm"
      sx={{
        gap: 1,
        '--List-nestedInsetStart': '30px',
        '--ListItem-radius': (theme) => theme.vars.radius.sm,
      }}
    >
      {ItemData.map((item, ind) => (
        <ListItem key={ind} onClick={() => handleClick(item)}>
          <ListItemButton selected={selectedItem === item.a}>
          {item.icon}
            <ListItemContent>
              <Typography level="title-sm">{item.a}</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
      </List>

      </Box>

      <Divider />
      
      <Navlink to={'/profile'}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={logaut}>
          <LogoutRoundedIcon />
        </IconButton>
        </Box>
      </Navlink>
    </Sheet>
  );
}

