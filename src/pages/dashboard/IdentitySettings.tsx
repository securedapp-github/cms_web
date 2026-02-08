
import { useState } from 'react';
import { useMockBackend } from '../../context/MockBackendContext';
import { Key, Globe, Smartphone, Shield, Plus, Wallet, Trash2 } from 'lucide-react';

const IdentitySettings = () => {
    const { user, linkIdentity } = useMockBackend();
    const [isLinking, setIsLinking] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const handleLinkWallet = () => {
        if (walletAddress) {
            linkIdentity('wallet', walletAddress);
            setIsLinking(false);
            setWalletAddress('');
        }
    };

    const handleLinkProvider = (provider: string) => {
        // Mock linking
        const mockId = `${provider}_${Math.random().toString(36).substr(2, 6)}`;
        linkIdentity(provider, mockId);
    };

    if (!user) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-indigo-600" />
                Identity & Access
            </h2>

            {/* Linked Identities */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Linked Accounts</h3>
                <div className="space-y-4">
                    {user.linkedIdentities && user.linkedIdentities.length > 0 ? (
                        user.linkedIdentities.map((identity, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                                <div className="flex items-center">
                                    {identity.provider === 'google' && <Globe className="w-5 h-5 text-red-500 mr-3" />}
                                    {identity.provider === 'wallet' && <Wallet className="w-5 h-5 text-orange-500 mr-3" />}
                                    {identity.provider === 'aadhaar' && <Key className="w-5 h-5 text-green-600 mr-3" />}
                                    {identity.provider === 'other' && <Smartphone className="w-5 h-5 text-gray-500 mr-3" />}

                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white uppercase">{identity.provider}</p>
                                        <p className="text-xs text-gray-500">Linked on {new Date(identity.linkedAt).toLocaleDateString()}</p>
                                        <p className="text-xs font-mono text-gray-400">{identity.id}</p>
                                    </div>
                                </div>
                                <button className="text-red-500 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No external accounts linked.</p>
                    )}
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Link</h4>
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={() => handleLinkProvider('google')}
                            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            Link Google
                        </button>
                        <button
                            onClick={() => handleLinkProvider('aadhaar')}
                            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <Key className="w-4 h-4 mr-2" />
                            Link Aadhaar
                        </button>
                        <button
                            onClick={() => setIsLinking(!isLinking)}
                            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <Wallet className="w-4 h-4 mr-2" />
                            Link Wallet
                        </button>
                    </div>

                    {isLinking && (
                        <div className="mt-4 p-4 border border-indigo-100 rounded-md bg-indigo-50 dark:bg-indigo-900/30">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wallet Address</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    placeholder="0x..."
                                />
                                <button
                                    onClick={handleLinkWallet}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Verification Status</h3>
                <div className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${user.isVerified ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {user.isVerified ? <Shield className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.isVerified ? 'Identity Verified' : 'Verification Pending'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {user.isVerified
                                ? 'Your identity has been verified securely.'
                                : 'Please complete your profile and link a trusted identity provider.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdentitySettings;
