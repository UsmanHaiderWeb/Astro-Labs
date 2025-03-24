import * as React from 'react'
import { Link } from 'react-router-dom'
import '../App'

const PaymentSuccessPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-4 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="bg-grayBackground rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-max sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div>
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={40} height={40}>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-100" id="modal-headline">
                            Subscription Completed
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm leading-5 text-gray-500">
                                Your subscription has been successfully completed. You can now access all the features of our service that were mentioned. Thank you for choosing us! If you have any inquiry, contact us.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <Link to={'/'} className="flex w-full rounded-md shadow-sm">
                        <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Home Page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PaymentSuccessPage)