import { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaSearch, 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaFileExport,
  FaPrint,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './RegisteredHolders.css'
import { utils, writeFile } from 'xlsx';

const RegisteredHolders = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'registered_at',
    direction: 'desc'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


const exportToExcel = () => {
  // Prepare data for export
  const data = users.map(user => ({
    'Name': user.name,
    'Account No': user.acno,
    'CHN': user.chn || 'N/A',
    'Email': user.email || 'N/A', 
    'Phone': user.phone_number || 'N/A',
    'Holdings': user.holdings,
    'Registered At': formatDate(user.registered_at)
  }));

  // Create worksheet
  const worksheet = utils.json_to_sheet(data);
  
  // Create workbook
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Registered Users');
  
  // Generate Excel file
  writeFile(workbook, 'Registered_Users.xlsx', { compression: true });
};





  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://e-voting-backeknd-production-077c.up.railway.app/api/registered-users?page=${pagination.page}&pageSize=${pagination.pageSize}&sortBy=${sortConfig.key}&sortOrder=${sortConfig.direction}&search=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.data);
      setPagination({
        ...pagination,
        totalItems: data.pagination.totalItems,
        totalPages: data.pagination.totalPages
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, sortConfig, searchTerm]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset to page 1 when searching
    setPagination({ ...pagination, page: 1 });
    fetchUsers();
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="registered-users-container">
      <div className="header-section">
        <h1><FaUsers /> Registered Shareholders</h1>
        <div className="action-buttons">
          <button className="export-btn" onClick={() => window.print()}>
            <FaPrint /> Print
          </button>
          <button className="export-btn" onClick={exportToExcel}>
            <FaFileExport /> Export
          </button>
          
        </div>
      </div>

      <div className="controls-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, account no, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>

        <div className="page-size-selector">
          <label>Items per page:</label>
          <select
            value={pagination.pageSize}
            onChange={(e) => setPagination({
              ...pagination,
              pageSize: Number(e.target.value),
              page: 1
            })}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>
                    <div className="th-content">
                      Name {getSortIcon('name')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('acno')}>
                    <div className="th-content">
                      Account No {getSortIcon('acno')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('chn')}>
                    <div className="th-content">
                      CHN {getSortIcon('chn')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('email')}>
                    <div className="th-content">
                      Email {getSortIcon('email')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('phone_number')}>
                    <div className="th-content">
                      Phone {getSortIcon('phone_number')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('holdings')}>
                    <div className="th-content">
                      Holdings {getSortIcon('holdings')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('registered_at')}>
                    <div className="th-content">
                      Registered At {getSortIcon('registered_at')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={`${user.acno}-${user.registered_at}`}>
                      <td>{user.name}</td>
                      <td>{user.acno}</td>
                      <td>{user.chn || 'N/A'}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.holdings}</td>
                      <td>{formatDate(user.registered_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">
                      No registered users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <FaArrowLeft /> Previous
            </button>
            
            <div className="page-info">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next <FaArrowRight />
            </button>
          </div>

          <div className="summary-info">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.totalItems)} of{' '}
            {pagination.totalItems} registered users
          </div>
        </>
      )}
    </div>
  );
};

export default RegisteredHolders;