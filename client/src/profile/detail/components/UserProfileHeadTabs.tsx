import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  profileTabValueSelector,
  setProfileTabValue,
} from '../../../redux/slices/profile.slice';
import { PROFILE_HEAD_TABS } from '../../constants/index.constant';

export const UserProfileHeadTabs = () => {
  const tabValue = useAppSelector(profileTabValueSelector);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Tabs
        value={tabValue}
        onChange={(e, value) => dispatch(setProfileTabValue(value))}
        textColor="inherit"
        indicatorColor="primary"
      >
        {PROFILE_HEAD_TABS.map((item) => (
          <Tab
            label={item.label}
            value={item.value}
            key={item.value}
            sx={{
              '&:hover': { bgcolor: 'hoverOverlay.main' },
              color: tabValue === item.value ? 'primary.main' : 'inherit',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
