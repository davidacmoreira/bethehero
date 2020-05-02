import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ScrollView, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const item = route.params.item;
    const message = `hi ${item.name}. im the hero of the case ${item.title}, helping with ${Intl.NumberFormat('US', { style: 'currency', currency: 'USD' }).format(item.value)}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `hero of the case: ${item.title}`,
            recipients: [item.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${item.whatsapp}&text=${message}`);
    }

    return (
        <ScrollView scrollEnabled={true}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImg} />

                    <TouchableOpacity onPress={navigateBack}>
                        <Feather name="arrow-left" size={28} color="#E82041" />
                    </TouchableOpacity>
                </View>

                <View style={styles.case}>
                    <Text style={[styles.caseProperty, { marginTop: 0 }]}>
                        organization: <Text style={styles.caseValue}>{item.name}, {item.city}</Text>
                    </Text>

                    <Text style={[styles.caseProperty]}>
                        case: <Text style={styles.caseValue}>{item.title}</Text>
                    </Text>

                    <Text style={[styles.caseProperty]}>
                        description: <Text style={styles.caseValue}>{item.description}</Text>
                    </Text>

                    <Text style={[styles.caseProperty]}>
                        value: <Text style={styles.caseValue}>{Intl.NumberFormat('PT', { style: 'currency', currency: 'EUR' }).format(item.value)}</Text>
                    </Text>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>save the day</Text>
                    <Text style={styles.heroTitle}>be the hero of this case</Text>
                    
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>email</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>whatsapp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}