import React, { useState, useEffect } from 'react';
import { databases } from './lib/appwrite';
import { Query } from 'appwrite';

export default function AttendanceList({ courseId }) {
    const [records, setRecords] = useState([]);

    const fetchRecords = async () => {
        try {
            const response = await databases.listDocuments(
                '6981930d001d39384a47',
                '69819372001ebb4f7678',
                [
                    Query.equal('course-id', courseId),
                    Query.orderDesc('timestamp'),
                    Query.limit(10)
                ]
            );
            setRecords(response.documents);
        } catch (error) {
            console.error("Fetch Error:", error.message);
        }
    };

    useEffect(() => {
        fetchRecords();
        const interval = setInterval(fetchRecords, 3000); // 3-second live refresh
        return () => clearInterval(interval);
    }, [courseId]);

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={styles.tableHeader}>
                <span style={styles.col}>Student ID</span>
                <span style={styles.col}>Time</span>
                <span style={styles.col}>Status</span>
            </div>
            {records.map(record => (
                <div key={record.$id} style={styles.row}>
                    <span style={styles.col}>{record['student-id']}</span>
                    <span style={styles.col}>{new Date(record.timestamp).toLocaleTimeString()}</span>
                    <span style={{ ...styles.col, color: 'green' }}>Verified ✓</span>
                </div>
            ))}
            {records.length === 0 && <p style={{ color: '#888' }}>No scans yet. Waiting for students...</p>}
        </div>
    );
}

const styles = {
    tableHeader: { display: 'flex', fontWeight: 'bold', padding: '10px', backgroundColor: '#f5f5f5' },
    row: { display: 'flex', padding: '10px', borderBottom: '1px solid #eee' },
    col: { flex: 1 }
};