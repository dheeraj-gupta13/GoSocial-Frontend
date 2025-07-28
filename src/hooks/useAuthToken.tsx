import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/userContext'

const useAuthToken: React.FC = () => {

    const { token } = useAuth();
    return [token];
}

export default useAuthToken