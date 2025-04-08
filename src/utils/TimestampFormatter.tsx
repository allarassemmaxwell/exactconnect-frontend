import React from 'react';

interface TimestampFormatterProps {
    timestamp: string | number;
}

const TimestampFormatter: React.FC<TimestampFormatterProps> = ({ timestamp }) => {
    const formatDate = (timestamp: string | number): string => {
        const date = new Date(timestamp);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return <>{formatDate(timestamp)}</>;
};

export default TimestampFormatter;
