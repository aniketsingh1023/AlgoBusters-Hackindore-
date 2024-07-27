from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Define a dictionary of FAQs with their answers
faqs = {
    # FAQs for Municipal Employees
    "What are my responsibilities as a municipal employee?": 
        "Responsibilities include maintaining public services, enforcing regulations, addressing citizen complaints, and ensuring efficient municipal operations.",
    "How do I report an issue or concern related to my job?": 
        "Use the internal communication channels provided, such as the intranet portal, internal email, or directly report to your supervisor or HR.",
    "What should I do if I encounter a problem with municipal resources or tools?": 
        "Report the issue to the IT or facilities management department via the helpdesk service or reporting system.",
    "How do I access training and development programs?": 
        "Check the intranet or contact the Human Resources department for information on training programs and development opportunities.",
    "What is the process for requesting time off or leave?": 
        "Submit a leave request through the HR management system or directly to your supervisor, following established policies.",
    "How can I address a workplace conflict or grievance?": 
        "Report conflicts or grievances to the HR department or use the designated grievance redressal system.",
    "What are the procedures for handling citizen complaints?": 
        "Follow the protocol for documenting, investigating, and resolving citizen complaints within the stipulated time frame.",
    "How do I access and use municipal data or records?": 
        "Access data or records through the designated data management system or with permission from the relevant department.",
    "What are the safety and emergency procedures I should follow?": 
        "Familiarize yourself with safety and emergency protocols outlined in employee handbooks or provided by the safety officer.",
    "How do I update my personal information in the municipal records?": 
        "Update personal information through the HR department or employee self-service portal.",
    "What are the procedures for reporting and managing workplace safety hazards?": 
        "Report safety hazards to the safety officer or through the municipal safety management system.",
    "How can I get information about my job performance and evaluations?": 
        "Discuss performance and evaluations with your supervisor or HR department, and review any performance reports available on the intranet.",
    "What is the process for applying for promotions or transfers?": 
        "Apply for promotions or transfers through the HR department, following the established procedures and eligibility criteria.",
    "How do I access employee benefits and compensation information?": 
        "Access benefits and compensation information through the HR department or the employee self-service portal.",
    "What should I do if I need to address an ethical or compliance issue?": 
        "Report ethical or compliance issues to the municipal ethics committee or use the designated whistleblower reporting system.",
    "How can I participate in municipal committees or work groups?": 
        "Express interest in participating through your department or HR, and review any announcements about committee openings.",
    "What are the procedures for handling and reporting workplace harassment?": 
        "Report harassment to the HR department or through the designated harassment reporting system, following established protocols.",
    "How do I access and use municipal vehicles or equipment?": 
        "Follow the procedures outlined by the facilities management department for booking and using municipal vehicles or equipment.",
    "What are the guidelines for maintaining work-life balance?": 
        "Adhere to the municipal corporation’s policies on work hours and leave, and seek support from HR or employee wellness programs.",
    "How can I provide feedback about workplace policies or procedures?": 
        "Provide feedback through employee surveys, suggestion boxes, or directly to HR or your supervisor.",
    "How do I handle confidential information in my role?": 
        "Follow confidentiality policies and procedures provided by the municipal corporation to ensure the proper handling of sensitive information.",
    "What are the procedures for managing work-related stress or mental health issues?": 
        "Seek support from employee assistance programs, HR, or designated mental health resources within the municipal corporation.",
    "How can I access information about municipal budgets and financials?": 
        "Access budget and financial information through the finance department or the municipal intranet, subject to your role and permissions.",
    "What should I do if I encounter technical issues with municipal software systems?": 
        "Report technical issues to the IT support team or helpdesk for troubleshooting and resolution.",
    "How do I manage and track project progress in my role?": 
        "Use project management tools and follow departmental procedures for tracking and reporting project progress.",
    "What are the procedures for reporting and managing conflicts of interest?": 
        "Report conflicts of interest to the HR department or ethics committee, following the municipal corporation’s guidelines.",
    "How do I access and use employee performance management tools?": 
        "Access performance management tools through the HR department or the employee self-service portal, and follow the guidelines provided.",
    "What should I do if I need to take an extended leave of absence?": 
        "Submit a request for extended leave through HR, providing any required documentation and following the leave policies.",
    "How can I stay updated on changes to municipal policies and procedures?": 
        "Stay updated by reviewing communications from HR, attending staff meetings, and checking the intranet for policy updates.",
    "What are the procedures for handling financial or procurement requests?": 
        "Follow the financial or procurement procedures outlined by the finance department, including submission and approval processes.",
    
    # FAQs for Citizens
    "How can I report a problem with public services, such as water supply or sanitation?": 
        "Report issues through the municipal corporation’s helpline, website, or mobile app, providing detailed information for a prompt response.",
    "Where can I find information about upcoming public events or municipal programs?": 
        "Check the municipal corporation’s official website, social media pages, or local community centers for information.",
    "How do I apply for building permits or other municipal approvals?": 
        "Submit applications through the municipal corporation’s online portal or visit the relevant department office.",
    "What should I do if I notice illegal dumping or unauthorized construction?": 
        "Report illegal activities to the municipal enforcement department through their complaint system, including specific details and evidence.",
    "How can I request maintenance or repairs for public infrastructure, such as roads or parks?": 
        "File a maintenance request through the municipal corporation’s online portal, mobile app, or contact the relevant department.",
    "How do I check the status of my property tax or utility bills?": 
        "Check the status through the municipal corporation’s online payment system or contact the finance department.",
    "What are the procedures for resolving disputes related to property or municipal services?": 
        "Resolve disputes by contacting the municipal corporation’s dispute resolution department or using their online complaint system.",
    "How can I get involved in municipal decision-making or public consultations?": 
        "Participate in public consultations, community meetings, and advisory boards, or provide feedback through official channels.",
    "Where can I find information about local health and safety services?": 
        "Information is available on the municipal corporation’s website, through local health departments, or community service centers.",
    "How do I report issues related to public transportation or traffic management?": 
        "Report issues to the municipal transportation department via their helpline, website, or mobile app.",
    "What are the procedures for filing a complaint about municipal employees?": 
        "File complaints through the municipal corporation’s official complaint system, providing details about the issue.",
    "How can I request a copy of municipal records or documents?": 
        "Request copies of records through the municipal corporation’s records office or online public records request system.",
    "What are the guidelines for participating in municipal advisory committees?": 
        "Review participation guidelines and apply through announcements made by the municipal corporation or contact the relevant department.",
    "How can I report and address issues related to public safety and emergency services?": 
        "Report safety and emergency issues through the municipal public safety department or emergency services contact numbers.",
    "Where can I find information about property zoning and land use regulations?": 
        "Access information on zoning and land use regulations through the municipal planning department or their website.",
    "How do I apply for municipal grants or subsidies?": 
        "Apply for grants or subsidies through the municipal grants department or their online application system.",
    "What should I do if I encounter problems with municipal waste management services?": 
        "Report waste management issues to the municipal sanitation department via their helpline or online complaint system.",
    "How can I access community services and resources offered by the municipality?": 
        "Access community services through the municipal corporation’s website, local community centers, or by contacting relevant departments.",
    "What are the procedures for obtaining permits for public events or gatherings?": 
        "Apply for permits through the municipal events department or use their online application system for public events and gatherings.",
    "How can I provide feedback on municipal services and initiatives?": 
        "Provide feedback through the municipal corporation’s feedback forms, surveys, or contact their customer service department.",
    "What are the procedures for requesting an official municipal investigation?": 
        "Request an investigation through the municipal corporation’s complaint or inquiry system, providing necessary details and evidence.",
    "How can I get information on local business licenses and regulations?": 
        "Obtain information on business licenses and regulations from the municipal business licensing department or their website.",
    "Where can I find information about municipal budgeting and financial planning?": 
        "Access budget and financial planning information through the municipal finance department or their public reports.",
    "How do I report issues related to noise pollution?": 
        "Report noise pollution issues to the municipal enforcement department through their complaint system, providing details of the problem.",
    "What are the procedures for obtaining a public records request?": 
        "Submit a public records request through the municipal records office or online request form, following the established procedures.",
    "How can I access information about public health initiatives and resources?": 
        "Access information about public health initiatives through the municipal health department’s website or local health clinics.",
}

# Define the default route to return the index.html file
@app.route("/")
def index():
    return render_template("index.html")

# Define the /api route to handle POST requests
@app.route("/api", methods=["POST"])
def api():
    # Get the message from the POST request
    message = request.json.get("message")
    print(f"Received message: {message}")
    
    # Check if the message matches any of the predefined FAQs
    if message in faqs:
        response_content = faqs[message]
    else:
        # Default response if no match found
        response_content = "I'm here to help! What do you need?"

    # Return the fixed response as JSON
    return jsonify({"content": response_content})

if __name__ == '__main__':
    app.run()
