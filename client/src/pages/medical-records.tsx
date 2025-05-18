import DashboardLayout from '@/components/layout/dashboard-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const dummyRecords = [
  { id: 'MR-001', patient: 'John Doe', date: '2024-07-01', type: 'X-Ray', doctor: 'Dr. Smith', fileUrl: '#' },
  { id: 'MR-002', patient: 'Jane Smith', date: '2024-07-02', type: 'Blood Test', doctor: 'Dr. Patel', fileUrl: '#' },
  { id: 'MR-003', patient: 'Alice Johnson', date: '2024-07-03', type: 'MRI', doctor: 'Dr. Lee', fileUrl: '#' },
  { id: 'MR-004', patient: 'Bob Lee', date: '2024-07-04', type: 'CT Scan', doctor: 'Dr. Green', fileUrl: '#' },
  { id: 'MR-005', patient: 'Sara Kim', date: '2024-07-05', type: 'Ultrasound', doctor: 'Dr. Brown', fileUrl: '#' },
  { id: 'MR-006', patient: 'Delta Inc.', date: '2024-07-06', type: 'Physical Exam', doctor: 'Dr. White', fileUrl: '#' },
  { id: 'MR-007', patient: 'Eve Adams', date: '2024-07-07', type: 'X-Ray', doctor: 'Dr. Smith', fileUrl: '#' },
  { id: 'MR-008', patient: 'Frank Wu', date: '2024-07-08', type: 'Blood Test', doctor: 'Dr. Patel', fileUrl: '#' },
  { id: 'MR-009', patient: 'Grace Lin', date: '2024-07-09', type: 'MRI', doctor: 'Dr. Lee', fileUrl: '#' },
  { id: 'MR-010', patient: 'Hank Green', date: '2024-07-10', type: 'CT Scan', doctor: 'Dr. Green', fileUrl: '#' },
  { id: 'MR-011', patient: 'Ivy Chen', date: '2024-07-11', type: 'Ultrasound', doctor: 'Dr. Brown', fileUrl: '#' },
  { id: 'MR-012', patient: 'Jack Ma', date: '2024-07-12', type: 'Physical Exam', doctor: 'Dr. White', fileUrl: '#' },
  { id: 'MR-013', patient: 'Kara Zor', date: '2024-07-13', type: 'X-Ray', doctor: 'Dr. Smith', fileUrl: '#' },
  { id: 'MR-014', patient: 'Leo King', date: '2024-07-14', type: 'Blood Test', doctor: 'Dr. Patel', fileUrl: '#' },
  { id: 'MR-015', patient: 'Mona Ray', date: '2024-07-15', type: 'MRI', doctor: 'Dr. Lee', fileUrl: '#' },
  { id: 'MR-016', patient: 'Nina Fox', date: '2024-07-16', type: 'CT Scan', doctor: 'Dr. Green', fileUrl: '#' },
  { id: 'MR-017', patient: 'Oscar Sun', date: '2024-07-17', type: 'Ultrasound', doctor: 'Dr. Brown', fileUrl: '#' },
  { id: 'MR-018', patient: 'Paul Lee', date: '2024-07-18', type: 'Physical Exam', doctor: 'Dr. White', fileUrl: '#' },
  { id: 'MR-019', patient: 'Quinn Yu', date: '2024-07-19', type: 'X-Ray', doctor: 'Dr. Smith', fileUrl: '#' },
  { id: 'MR-020', patient: 'Rita Ora', date: '2024-07-20', type: 'Blood Test', doctor: 'Dr. Patel', fileUrl: '#' },
];

export default function MedicalRecordsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Medical Records</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Record ID</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>File</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyRecords.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell>{rec.id}</TableCell>
              <TableCell>{rec.patient}</TableCell>
              <TableCell>{rec.date}</TableCell>
              <TableCell>{rec.type}</TableCell>
              <TableCell>{rec.doctor}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon" asChild>
                  <a href={rec.fileUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-5 w-5" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
} 