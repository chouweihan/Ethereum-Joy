import React, { useState, useRef, useEffect } from 'react';
import { Card, Box, CardContent, Typography, IconButton, CardMedia, useTheme, Slider, styled, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudioImage from "../../Assets/Images/gasgasgas.jpg";
import GasAudio from "../../Assets/Audio/gasgasgas.mp3";
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeDown from '@mui/icons-material/VolumeDown';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const AudioCard = () => {
    const theme = useTheme();
    const audio = useRef(new Audio(GasAudio));
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [curTime, setCurTime] = useState<number>(0);
    const [maxAudio, setMaxAudio] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [showVolume, setShowVolume] = useState<boolean>(false);

    audio.current.addEventListener("ended", ()=> {
        audio.current.currentTime = 0;
        audio.current.play();
    });

    audio.current.addEventListener("timeupdate", function () {
      setCurTime(audio.current.currentTime);
    });

    audio.current.addEventListener('loadedmetadata', () => {
      setMaxAudio(audio.current.duration);
    });  

    const handleTimeChange = (event: Event, value: number | number[], activeThumb: number) => {
      setCurTime(value as number);
      audio.current.currentTime = value as number;
    }

    const handleVolumeChange = (event: Event, value: number | number[], activeThumb: number) => {
      setVolume(value as number);
      audio.current.volume = value as number;
    }

    function formatDuration(value: number) : string {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 9 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)}`;
    }

    const toggleAudio = () => {
      if(!isPlaying) {
          audio.current.play();
      } else {
          audio.current.pause();
      }
      setIsPlaying(prev => !prev);
    }

    useEffect(() => {
      const copy = audio.current;
      return () => {
        copy.pause();
      }
    }, [])

    return (
      <Card sx={{ display: 'flex', width: "100%", overflow: "visible" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", pt: "5px", pb: "0 !important" }}>
          <Box sx={{ fontFamily: "'Open Sans', sans-serif", flexGrow: 1 }} display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography component="div" variant="h6" fontSize={18} display="inline">
                  Gas Gas Gas 
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ ml: 1 }} display="inline">
                Manuel
                </Typography>
              </Box>
              <IconButton aria-label="play/pause" onClick={toggleAudio} color="primary" sx={{position: "absolute", left: "50%", top: 2,
                transform: "translateX(-50%)"
              }}>
                {
                    isPlaying ? 
                    <PauseIcon sx={{ height: 28, width: 28 }} />
                    :
                    <PlayArrowIcon sx={{ height: 28, width: 28 }} />
                }
              </IconButton>
              <Box sx={{position: "relative"}}>
                {
                  showVolume &&
                  <Box sx={{ width: 200, position: "absolute", bottom: "50px", right: 0,  }} component={Card}>
                    <Stack spacing={2} direction="row" sx={{padding: "4px 8px"}} alignItems="center">
                      <IconButton onClick={() => {
                        setVolume(0);
                        audio.current.volume = 0;
                      }}>
                        <VolumeDown />
                      </IconButton>
                      <Slider 
                        size="small"
                        aria-label="Volume" 
                        value={volume} 
                        max={1} 
                        step={0.1} 
                        onChange={handleVolumeChange} />
                      <IconButton onClick={() => {
                        setVolume(1);
                        audio.current.volume = 1;
                      }}>
                        <VolumeUp />
                      </IconButton>
                    </Stack>
                  </Box>
                }
                <IconButton onClick={() => {setShowVolume(prev => !prev)}}>
                    <VolumeUp />
                </IconButton>
              </Box>
            </Box>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={curTime}
              min={0}
              color="primary"
              step={0.1}
              max={maxAudio}
              onChange={handleTimeChange}
              sx={{
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:before': {
                    boxShadow: '0 2px 6px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === 'dark'
                        ? 'rgb(255 255 255 / 16%)'
                        : 'rgb(0 0 0 / 16%)'
                    }`,
                  },
                  '&.Mui-active': {
                    width: 13,
                    height: 13,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -1,
              }}
            >
              <TinyText>{formatDuration(curTime)}</TinyText>
              <TinyText>{formatDuration(curTime - maxAudio)}</TinyText>
            </Box>
          </Box>
          </CardContent>  
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image={AudioImage}
          alt="Gas Gas Gas"
        />
      </Card>
    );
}

export default AudioCard