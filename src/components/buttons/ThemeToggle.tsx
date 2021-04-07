import React, { useContext } from 'react';
import { Switch, Tooltip } from '@material-ui/core';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { lightMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip title={lightMode ? 'Turn off the lights' : 'Turn the lights on'}>
      <Switch
        checked={lightMode}
        onChange={toggleTheme}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </Tooltip>
  );
};

export default ThemeToggle