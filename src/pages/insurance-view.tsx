import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialClaims = [
  { id: 'CL-2001', holder: 'Alice Johnson', date: '2024-06-15', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2002', holder: 'Bob Lee', date: '2024-06-18', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2003', holder: 'Charlie Kim', date: '2024-06-20', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2004', holder: 'Diana Fox', date: '2024-06-21', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2005', holder: 'Evan Lin', date: '2024-06-22', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2006', holder: 'Fiona Ray', date: '2024-06-23', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2007', holder: 'George Sun', date: '2024-06-24', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2008', holder: 'Hannah Lee', date: '2024-06-25', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2009', holder: 'Ian King', date: '2024-06-26', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2010', holder: 'Julia Ma', date: '2024-06-27', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2011', holder: 'Kevin Yu', date: '2024-06-28', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2012', holder: 'Lily Chen', date: '2024-06-29', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2013', holder: 'Mason Fox', date: '2024-06-30', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2014', holder: 'Nina Patel', date: '2024-07-01', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2015', holder: 'Oscar Green', date: '2024-07-02', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2016', holder: 'Paula Ray', date: '2024-07-03', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2017', holder: 'Quinn Lee', date: '2024-07-04', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2018', holder: 'Rita Wang', date: '2024-07-05', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2019', holder: 'Sam Hill', date: '2024-07-06', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2020', holder: 'Tina Fey', date: '2024-07-07', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2021', holder: 'Uma Thur', date: '2024-07-08', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2022', holder: 'Vera Wang', date: '2024-07-09', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2023', holder: 'Will Fox', date: '2024-07-10', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2024', holder: 'Xena Ray', date: '2024-07-11', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2025', holder: 'Yara Lin', date: '2024-07-12', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2026', holder: 'Zane Lee', date: '2024-07-13', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2027', holder: 'Amy Poe', date: '2024-07-14', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2028', holder: 'Ben Fox', date: '2024-07-15', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2029', holder: 'Cara Sun', date: '2024-07-16', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2030', holder: 'Derek Lin', date: '2024-07-17', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2031', holder: 'Eli Kim', date: '2024-07-18', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2032', holder: 'Fay Wu', date: '2024-07-19', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2033', holder: 'Gina Ma', date: '2024-07-20', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2034', holder: 'Hugo Sun', date: '2024-07-21', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2035', holder: 'Iris Lee', date: '2024-07-22', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2036', holder: 'Jake Fox', date: '2024-07-23', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2037', holder: 'Kira Lin', date: '2024-07-24', status: 'Pending', pdfUrl: '#' },
  { id: 'CL-2038', holder: 'Liam King', date: '2024-07-25', status: 'Approved', pdfUrl: '#' },
  { id: 'CL-2039', holder: 'Mona Ray', date: '2024-07-26', status: 'Rejected', pdfUrl: '#' },
  { id: 'CL-2040', holder: 'Nina Fox', date: '2024-07-27', status: 'Pending', pdfUrl: '#' },
];

export default function InsuranceViewPage() {
  const [claims, setClaims] = useState(initialClaims);
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const totalPages = Math.ceil(claims.length / pageSize);
  const paginatedClaims = claims.slice((page - 1) * pageSize, page * pageSize);

  const handleStatusChange = (id: string, newStatus: string) => {
    setClaims((prev) => prev.map((c) => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Insurance Claims</h1>
      <Table className="text-xs">
        <TableHeader>
          <TableRow className="h-7 py-0">
            <TableHead className="w-24 py-0">Claim ID</TableHead>
            <TableHead className="w-32 py-0">Policy Holder</TableHead>
            <TableHead className="w-20 py-0">Date</TableHead>
            <TableHead className="w-24 py-0">Status</TableHead>
            <TableHead className="w-12 py-0">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedClaims.map((c) => (
            <TableRow key={c.id} className="h-7 py-0 hover:bg-blue-50 transition-colors">
              <TableCell className="truncate w-24 py-0">{c.id}</TableCell>
              <TableCell className="truncate w-32 py-0">{c.holder}</TableCell>
              <TableCell className="truncate w-20 py-0">{c.date}</TableCell>
              <TableCell className="w-24 py-0">
                <Select value={c.status} onValueChange={v => handleStatusChange(c.id, v)}>
                  <SelectTrigger className="w-full text-xs py-0 h-6 min-h-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
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
    </DashboardLayout>
  );
} 