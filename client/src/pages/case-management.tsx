import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const initialCases = [
  { id: 'C-1001', date: '2024-07-01', client: 'John Doe', status: 'Open', pdfUrl: '#' },
  { id: 'C-1002', date: '2024-07-02', client: 'Jane Smith', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1003', date: '2024-07-03', client: 'Acme Corp.', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1004', date: '2024-07-04', client: 'Bob Lee', status: 'Open', pdfUrl: '#' },
  { id: 'C-1005', date: '2024-07-05', client: 'Sara Kim', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1006', date: '2024-07-06', client: 'Delta Inc.', status: 'Open', pdfUrl: '#' },
  { id: 'C-1007', date: '2024-07-07', client: 'Eve Adams', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1008', date: '2024-07-08', client: 'Frank Wu', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1009', date: '2024-07-09', client: 'Grace Lin', status: 'Open', pdfUrl: '#' },
  { id: 'C-1010', date: '2024-07-10', client: 'Hank Green', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1011', date: '2024-07-11', client: 'Ivy Chen', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1012', date: '2024-07-12', client: 'Jack Ma', status: 'Open', pdfUrl: '#' },
  { id: 'C-1013', date: '2024-07-13', client: 'Kara Zor', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1014', date: '2024-07-14', client: 'Leo King', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1015', date: '2024-07-15', client: 'Mona Ray', status: 'Open', pdfUrl: '#' },
  { id: 'C-1016', date: '2024-07-16', client: 'Nina Fox', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1017', date: '2024-07-17', client: 'Oscar Sun', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1018', date: '2024-07-18', client: 'Paul Lee', status: 'Open', pdfUrl: '#' },
  { id: 'C-1019', date: '2024-07-19', client: 'Quinn Yu', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1020', date: '2024-07-20', client: 'Rita Ora', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1021', date: '2024-07-21', client: 'Sam Hill', status: 'Open', pdfUrl: '#' },
  { id: 'C-1022', date: '2024-07-22', client: 'Tina Fey', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1023', date: '2024-07-23', client: 'Uma Thur', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1024', date: '2024-07-24', client: 'Vera Wang', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1025', date: '2024-07-25', client: 'Will Fox', status: 'Open', pdfUrl: '#' },
  { id: 'C-1026', date: '2024-07-26', client: 'Xena Ray', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1027', date: '2024-07-27', client: 'Yara Lin', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1028', date: '2024-07-28', client: 'Zane Lee', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1029', date: '2024-07-29', client: 'Amy Poe', status: 'Open', pdfUrl: '#' },
  { id: 'C-1030', date: '2024-07-30', client: 'Ben Fox', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1031', date: '2024-07-31', client: 'Cara Sun', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1032', date: '2024-08-01', client: 'Derek Lin', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1033', date: '2024-08-02', client: 'Eli Kim', status: 'Open', pdfUrl: '#' },
  { id: 'C-1034', date: '2024-08-03', client: 'Fay Wu', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1035', date: '2024-08-04', client: 'Gina Ma', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1036', date: '2024-08-05', client: 'Hugo Sun', status: 'In Review', pdfUrl: '#' },
  { id: 'C-1037', date: '2024-08-06', client: 'Iris Lee', status: 'Open', pdfUrl: '#' },
  { id: 'C-1038', date: '2024-08-07', client: 'Jake Fox', status: 'Closed', pdfUrl: '#' },
  { id: 'C-1039', date: '2024-08-08', client: 'Kira Lin', status: 'Pending', pdfUrl: '#' },
  { id: 'C-1040', date: '2024-08-09', client: 'Liam King', status: 'In Review', pdfUrl: '#' },
];

export default function CaseManagementPage() {
  const [cases, setCases] = useState(initialCases);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 15;

  // Filter cases by search
  const filteredCases = cases.filter(c =>
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.client.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCases.length / pageSize);
  const paginatedCases = filteredCases.slice((page - 1) * pageSize, page * pageSize);

  const handleStatusChange = (id: string, newStatus: string) => {
    setCases((prev) => prev.map((c) => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Case Management</h1>
      <div className="flex justify-end mb-2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by Case ID, Client, or Status..."
          className="border rounded px-2 py-1 text-xs w-64"
        />
      </div>
      <Card className="shadow-md">
        <CardContent className="p-0">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="h-7 py-0 bg-gray-100">
                <TableHead className="w-20 py-0">Case ID</TableHead>
                <TableHead className="w-20 py-0">Date</TableHead>
                <TableHead className="w-32 py-0">Client</TableHead>
                <TableHead className="w-24 py-0">Status</TableHead>
                <TableHead className="w-12 py-0">PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCases.map((c) => (
                <TableRow key={c.id} className="h-7 py-0 hover:bg-indigo-50 transition-colors">
                  <TableCell className="truncate w-20 py-0">{c.id}</TableCell>
                  <TableCell className="truncate w-20 py-0">{c.date}</TableCell>
                  <TableCell className="truncate w-32 py-0">{c.client}</TableCell>
                  <TableCell className="w-24 py-0">
                    <Select value={c.status} onValueChange={v => handleStatusChange(c.id, v)}>
                      <SelectTrigger className="w-full text-xs py-0 h-6 min-h-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Review">In Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="w-12 py-0">
                    <Button variant="outline" size="icon" asChild>
                      <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <div className="flex justify-end items-center gap-2 p-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <span className="text-xs">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
} 