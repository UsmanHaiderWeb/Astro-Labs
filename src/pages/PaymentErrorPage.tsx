import { X } from 'lucide-react'
import * as React from 'react'
import { Link } from 'react-router-dom'

const PaymentErrorPage = () => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 opacity-75"></div>
                </div>

                {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203; */}
                <div className="inline-block align-bottom bg-grayBackground rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div>
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                            <X size={40} stroke='red' />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className="text-lg leading-6 font-medium text-gray-100" id="modal-headline">
                                Subscription Canceled
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm leading-5 text-gray-500">
                                    Your subscription has been successfully completed. You can now access all the features of our service that were mentioned. Thank you for choosing us! If you have any inquiry, contact us.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <Link to='/pricing' className="flex w-full rounded-md shadow-sm">
                            <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-destructive/40 text-base leading-6 font-medium text-white shadow-sm hover:bg-destructive/60 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Try Again
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PaymentErrorPage)