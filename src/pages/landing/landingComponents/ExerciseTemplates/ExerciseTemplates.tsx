import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../../components/button';
import {Row} from '../../../../components/Reusable/reusable';
import {Template} from '../../../../types';
import {colors, Styles} from '../../../../util/styles';

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
    if (selectedTemplate === name) setSelectedTemplate(undefined);
    else setSelectedTemplate(name);
  };

  return (
    <View style={styles.container}>
      {templates.map((template, mainIndex) => (
        <TouchableHighlight
          underlayColor={colors.secondary}
          style={[styles.wrapper]}
          key={template.name}
          onPress={() => selectTemplate(template.name)}>
          <>
            <Row style={Styles.w100}>
              <Icon
                name="circle"
                color={
                  selectedTemplate === template.name
                    ? colors.accentDark
                    : colors.white
                }
                size={18}
                style={styles.select}
              />
              <Text style={styles.header}>{template.name}</Text>
              <Icon
                name={expandedView[mainIndex] ? 'caret-up' : 'caret-down'}
                size={22}
                style={styles.iconDown}
                onPress={() => toggleExpanded(mainIndex)}
              />
            </Row>
            <View
              style={{
                display: expandedView[mainIndex] ? 'flex' : 'none',
                marginTop: 6,
              }}>
              {template.exercises.map((exercise, index) => (
                <Row
                  key={exercise}
                  style={styles.exercise}
                  xAlign="space-between">
                  <Text style={styles.exerciseName}>{exercise}</Text>
                  <Text>{template.maxs[index]}</Text>
                </Row>
              ))}
            </View>
          </>
        </TouchableHighlight>
      ))}
      <Button
        color={selectedTemplate ? colors.primary : colors.secondary}
        disabled={selectedTemplate === undefined}
        elevated={selectedTemplate !== undefined}
        width="100%"
        textAlign="center"
        bold
        fontSize={14}>
        Start Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  wrapper: {
    padding: 8,
    backgroundColor: colors.grey400,
    borderRadius: 8,
    marginBottom: 8,
    width: '100%',
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  exercise: {
    backgroundColor: colors.grey100,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '600',
  },
  iconDown: {
    marginBottom: 8,
    left: '90%',
    top: -2,
    position: 'absolute',
  },
  select: {
    position: 'absolute',
    left: 5,
  },
});

export default ExerciseTemplates;
