import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Cases() {
    const [cases, setCases] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(item) {
        navigation.navigate('detail', { item });
    }

    async function loadCases() {
        if (loading) {
            return;
        }

        if (total > 0 && cases.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('cases', {
            params: { page }
        });

        setCases([...cases, ...response.data]);
        setTotal(Number(response.headers['x-total-count']));
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCases();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    total <Text style={styles.headerTextBold}>{String(total)} cases</Text>
                </Text>
            </View>

            <Text style={styles.title}>welcome</Text>
            <Text style={styles.description}>choose a case and save he day</Text>

            <FlatList
                data={cases}
                style={styles.casesList}
                keyExtractor={item => String(item.id)}
                //showsVerticalScrollIndicator={false}
                onEndReached={loadCases}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => (
                    <View style={styles.case}>
                        <Text style={styles.caseProperty}>organization</Text>
                        <Text style={styles.caseValue}>{item.name}</Text>
                        
                        <Text style={styles.caseProperty}>case</Text>
                        <Text style={styles.caseValue}>{item.title}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(item)}
                        >
                            <Text style={styles.detailsButtonText}>detail</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}