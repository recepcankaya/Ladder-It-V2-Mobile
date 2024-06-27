import React from 'react';
import { Text, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import colors from '../../ui/colors';
import { responsiveFontSize } from '../../ui/responsiveFontSize';

type ControlledInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    placeholder: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
}

const ControlledInput = <TFieldValues extends FieldValues>({
    control,
    name,
    placeholder,
    secureTextEntry,
    style,
    ...otherProps
}: ControlledInputProps<TFieldValues>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <TextInput
                        style={[styles.textInput, style]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        {...otherProps}
                    />
                    {error && <Text style={styles.errorMessage}>{error.message}</Text>}
                </>
            )}
        />
    );
};

export default ControlledInput;

const styles = StyleSheet.create({
    textInput: {
        fontSize: responsiveFontSize(15),
        backgroundColor: colors.yellow,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey,
        padding: 7,
    },
    errorMessage: {
        color: colors.black,
    },
});
