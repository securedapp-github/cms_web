import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, Mail, Phone, Shield, ArrowLeft, CheckCircle, User } from 'lucide-react';
import { useFiduciaryDetails } from '../../hooks/queries/useFiduciaryDetails';
import Loader from '../../components/common/Loader';

const FiduciaryDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fiduciaryId = location.state?.fiduciaryId;

  const { fiduciary, isLoading, error } = useFiduciaryDetails(fiduciaryId);

  useEffect(() => {
    if (!fiduciaryId) {
      navigate('/user/dashboard', { replace: true });
    }
  }, [fiduciaryId, navigate]);

  if (!fiduciaryId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50/50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !fiduciary) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Fiduciary Not Found</h2>
          <p className="text-slate-600 mb-6">The fiduciary details you're looking for could not be found.</p>
          <button
            onClick={() => navigate('/user/dashboard')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/30 to-violet-50/50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden mb-6">
          {/* Premium Banner */}
          <div className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            <div className="relative flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-2xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-3">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                  <span className="text-white text-sm font-medium">Verified Fiduciary</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{fiduciary.name}</h1>
                <p className="text-indigo-100 text-lg">Fiduciary Status: {fiduciary.status}</p>
              </div>
            </div>
          </div>

          {/* Fiduciary Basic Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-600 mb-1">Email</p>
                  <div
                    className="text-slate-900 font-semibold  break-all"
                  >
                    {fiduciary.email}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-600 mb-1">Phone</p>
                  <div
                    className="text-slate-900 font-semibold  break-all"
                  >
                    {fiduciary.mobile}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DPO Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Data Protection Officers</h2>
                <p className="text-indigo-100 text-sm">
                  {fiduciary.dataProtectionOfficers?.length || 0} registered DPO{(fiduciary.dataProtectionOfficers?.length || 0) !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {fiduciary.dataProtectionOfficers && fiduciary.dataProtectionOfficers.length > 0 ? (
              <div className="space-y-4">
                {fiduciary.dataProtectionOfficers.map((dpo) => (
                  <div
                    key={dpo.id}
                    className="border-2 border-gray-200 rounded-xl p-6 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-slate-900">{dpo.name}</h3>
                          {dpo.is_primary === 1 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Primary DPO
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Email */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                              <Mail className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-500 mb-0.5">Email</p>
                              <div 
                                // href={`mailto:${dpo.email}`}
                                className="text-sm font-semibold text-slate-900  transition-colors break-all"
                              >
                                {dpo.email}
                              </div>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                              <Phone className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                              <div
                                className="text-sm font-semibold text-slate-900 "
                              >
                                {dpo.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No DPOs Found</h3>
                <p className="text-gray-600">This fiduciary doesn't have any registered Data Protection Officers.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
          <p className="text-sm text-slate-600">
            This information is provided for transparency and compliance purposes. 
            For any data protection queries, please contact the DPO directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FiduciaryDetailsPage;
