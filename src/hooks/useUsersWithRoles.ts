import { useState, useEffect } from 'react';
import { getUsersWithRoles, assignRole as assignRoleAPI, removeRole as removeRoleAPI } from '../services/admin.service';
import type { UserWithRoles, Pagination } from '../types/admin.types';
import toast from 'react-hot-toast';

interface UseUsersWithRolesParams {
  page?: number;
  limit?: number;
  searchterm?: string;
}

export const useUsersWithRoles = (params?: UseUsersWithRolesParams) => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsers = async (isRefresh = false) => {
    try {
      isRefresh ? setIsRefreshing(true) : setIsLoading(true);
      const response = await getUsersWithRoles(params);
      
      // Handle both paginated and legacy response formats
      const responseData = response?.data || response;
      const usersData = responseData?.users || [];
      const paginationData = responseData?.pagination || null;
      
      setUsers(usersData);
      setPagination(paginationData);
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const assignRole = async (email: string, role: string) => {
    try {
      await assignRoleAPI(email, role);
      toast.success('Role assigned successfully');
      await fetchUsers(true);
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to assign role';
      toast.error(message);
      return false;
    }
  };

  const removeRole = async (email: string, role: string) => {
    try {
      await removeRoleAPI(email, role);
      toast.success('Role removed successfully');
      await fetchUsers(true);
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to remove role';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [params?.page, params?.limit, params?.searchterm]);

  return { 
    users,
    pagination,
    isLoading, 
    isRefreshing, 
    refetch: fetchUsers,
    assignRole,
    removeRole
  };
};
