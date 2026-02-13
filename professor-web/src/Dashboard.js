import React, { useState, useEffect } from 'react';
import { account, databases } from './lib/appwrite';
import { Query } from 'appwrite';
import { QRCodeCanvas } from 'qrcode.react';
import AttendanceList from './AttendanceList';

const DATABASE_ID = '6981930d001d39384a47';
const ATTENDANCE_COLLECTION = '69819372001ebb4f7678';

export default function Dashboard() {
    const [qrValue, setQrValue] = useState('');
    const [timeLeft, setTimeLeft] = useState(15);
    const currentCourse = "SOT"; // Demo ID

    useEffect(() => {
        const updateQR = () => {
            const timestamp = Math.floor(Date.now() / 15000);
            setQrValue(`${currentCourse}-${timestamp}`);
            setTimeLeft(15);
        };

        updateQR();
        const interval = setInterval(updateQR, 15000);
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);

        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>SOT Professor Portal</h1>
            <div style={styles.mainBox}>
                <div style={styles.qrSection}>
                    <QRCodeCanvas value={qrValue} size={300} />
                    <p style={styles.timerText}>Refreshing in: {timeLeft}s</p>
                </div>
                
                <div style={styles.feedSection}>
                    <h2 style={styles.feedTitle}>Live Attendance Feed</h2>
                    <AttendanceList courseId={currentCourse} />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' },
    title: { fontSize: '2.5rem', marginBottom: '30px' },
    mainBox: { display: 'flex', justifyContent: 'center', gap: '50px', alignItems: 'flex-start' },
    qrSection: { padding: '20px', border: '1px solid #eee', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    timerText: { marginTop: '15px', color: '#666', fontWeight: 'bold' },
    feedSection: { flex: 1, textAlign: 'left', minWidth: '400px' },
    feedTitle: { borderBottom: '2px solid #333', paddingBottom: '10px' }
};