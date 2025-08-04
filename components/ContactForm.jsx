import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_USER_ID')
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.log('Error sending email:', error.text);
            });

        e.target.reset();
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded shadow-md"
        >
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <form ref={formRef} onSubmit={sendEmail}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="user_name" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="user_email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea name="message" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows="4"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded">Send</button>
            </form>
        </motion.div>
    );
};

export default ContactForm;