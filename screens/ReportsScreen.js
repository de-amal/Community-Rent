import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import config from '../config';

export default function ReportsScreen() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get(`${config.SERVER_ENDPOINT}leader/all-reports`)
      .then(response => {
        console.log("Reports:", response.data);
        setReports(response.data.reports || []); // Ensure reports is an array
      })
      .catch(error => {
        console.log("Error fetching reports:", error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Reports</Text>
      {reports.map(report => (
        <View key={report._id} style={styles.reportContainer}>
          <Text>Name: {report.name}</Text>
          <Text>Reported By: {report.reportedBy || 'Anonymous'}</Text>
          <Text>Reporter Phone: {report.reporterPhone || 'N/A'}</Text>
          <Text>Reportee Phone: {report.phone}</Text>
          <Text>Reason: {report.reason}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
