import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import WidgetWrapper from '../../components/WidgetWrapper';
import ChannelCardList from './ChannelCardList';
import CreateChannelForm from './CreateChannelForm';

const ChannelIndex = ({ setIsRefresh, isRefresh }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <WidgetWrapper>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h3">
                        Channel
                    </Typography>
                    <Button style={{ textTransform: 'none' }} onClick={() => setOpen((preview) => !preview)}>Create channel</Button>
                </Box>
                <Box style={{ marginTop: '1rem', width: '100%' }}>
                    <Typography variant="body1">
                        MindMeld: Share, explore, innovate! Join vibrant discussions, spark
                        creativity, and collaborate with fellow thinkers.
                    </Typography>
                </Box>
            </WidgetWrapper>
            {open &&
                <WidgetWrapper>
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h3">
                                Create Channel
                            </Typography>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CreateChannelForm setIsRefresh={setIsRefresh} />
                        </Box>
                    </Box>
                </WidgetWrapper>}

            <WidgetWrapper>
                <Box>
                    <ChannelCardList isRefresh={isRefresh} />
                </Box>
            </WidgetWrapper>
        </Box>
    )
}

export default ChannelIndex;
