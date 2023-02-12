import {Box, Button, Icon, Pressable, Row, Text} from 'native-base';
import React, {useState} from 'react';
import FA from 'react-native-vector-icons/FontAwesome';
import {Template} from '../../../../types/workouts';

interface Props {
  templates: Template[];
}

const ExerciseTemplates: React.FC<Props> = ({templates}) => {
  const [expandedView, setExpandedView] = useState<Array<boolean>>(
    new Array(templates.length).fill(false),
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>();

  const toggleExpanded = (index: number) =>
    setExpandedView(prev => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });

  const selectTemplate = (name: string) => {
    if (selectedTemplate === name) {
      setSelectedTemplate(undefined);
    } else {
      setSelectedTemplate(name);
    }
  };

  return (
    <Row flexWrap={'wrap'}>
      {templates.length > 0 ? (
        templates.map((template, mainIndex) => (
          <Pressable
            p={2}
            mb={2}
            borderRadius={8}
            bg="gray.400"
            w="100%"
            key={template.name}
            onPress={() => selectTemplate(template.name)}>
            <>
              <Row w="100%">
                <Icon
                  as={FA}
                  name="circle"
                  color={
                    selectedTemplate === template.name ? 'primary.500' : 'white'
                  }
                  size={6}
                  position="absolute"
                  left={5}
                />
                <Text fontSize={16} fontWeight={600} textAlign="center">
                  {template.name}
                </Text>
                <Icon
                  name={expandedView[mainIndex] ? 'caret-up' : 'caret-down'}
                  size={22}
                  mb={2}
                  left={'90%'}
                  top={-2}
                  position="absolute"
                  onPress={() => toggleExpanded(mainIndex)}
                />
              </Row>
              <Box display={expandedView[mainIndex] ? 'flex' : 'none'} mt={1.5}>
                {template.exercises.map((exercise, index) => (
                  <Row
                    key={exercise}
                    bg={'gray.100'}
                    borderRadius={8}
                    px={2}
                    py={1}
                    mb={1}
                    justifyContent="space-between">
                    <Text fontWeight={600}>{exercise}</Text>
                    <Text>{template.maxs[index]}</Text>
                  </Row>
                ))}
              </Box>
            </>
          </Pressable>
        ))
      ) : (
        <Text textAlign="center" mb={3} w="100%">
          No Templates
        </Text>
      )}
      <Button
        bg={selectedTemplate ? 'primary.500' : 'gray.300'}
        disabled={selectedTemplate === undefined}
        shadow={selectedTemplate !== undefined ? 5 : 0}
        width="100%"
        textAlign="center"
        fontWeight={600}>
        Start Workout
      </Button>
    </Row>
  );
};

export default ExerciseTemplates;
