import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerComponent = ({ src }) => {
  return (
    <AudioPlayer
      src={src}
      customAdditionalControls={[]}
      customVolumeControls={[]}
      showJumpControls={false}
      layout='horizontal'
      style={{
        width: '550px',
        boxShadow: 'none',
        borderRadius: '10px',
        backgroundColor: 'transparent'
      }}
    />
  );
};

export default AudioPlayerComponent;
