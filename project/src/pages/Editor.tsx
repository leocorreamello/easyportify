import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Edit3, Save, X, Camera, Linkedin, Github, Twitter, Image, PlusCircle, Link as LinkIcon, Menu, X as CloseIcon, Trash2 } from 'lucide-react';

export default function Editor() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [aboutText, setAboutText] = useState('Write a brief introduction about yourself...');
  const [skillsText, setSkillsText] = useState('List your skills...');
  const [skills, setSkills] = useState<{ name: string; level: string }[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Basic');
  const [projects, setProjects] = useState<{ name: string; description: string; images: string[]; technologies: string[]; links: string[] }[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', images: [], technologies: [], links: [] });
  const [newTechnology, setNewTechnology] = useState('');
  const [newLink, setNewLink] = useState('');
  const [experience, setExperience] = useState<{ company: string; startDate: string; endDate: string; current: boolean }[]>([]);
  const [education, setEducation] = useState<{ institution: string; type: string; startDate: string; endDate: string }[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [fullName, setFullName] = useState(user?.full_name || 'Your Name');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const handleEditClick = (section: string) => {
    setEditingSection(section);
  };

  const handleSaveClick = () => {
    setEditingSection(null);
  };

  const handleCancelClick = () => {
    setEditingSection(null);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedProjects = [...projects];
        updatedProjects[index].images.push(reader.result as string);
        setProjects(updatedProjects);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTechnology = (projectIndex: number) => {
    if (newTechnology) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].technologies.push(newTechnology);
      setProjects(updatedProjects);
      setNewTechnology('');
    }
  };

  const handleDeleteTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies.splice(techIndex, 1);
    setProjects(updatedProjects);
  };

  const handleAddLink = (projectIndex: number) => {
    if (newLink) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].links.push(newLink);
      setProjects(updatedProjects);
      setNewLink('');
    }
  };

  const handleDeleteLink = (projectIndex: number, linkIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].links.splice(linkIndex, 1);
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, newProject]);
    setNewProject({ name: '', description: '', images: [], technologies: [], links: [] });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { company: '', startDate: '', endDate: '', current: false }]);
  };

  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setExperience(updatedExperience);
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const handleAddEducation = () => {
    setEducation([...education, { institution: '', type: '', startDate: '', endDate: '' }]);
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEducation(updatedEducation);
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleAddSkill = () => {
    if (newSkill) {
      setSkills([...skills, { name: newSkill, level: newSkillLevel }]);
      setNewSkill('');
      setNewSkillLevel('Basic');
    }
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-indigo-600 text-white py-4 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#profile" className="hover:underline">Profile</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#education" className="hover:underline">Education</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-indigo-600 text-white py-4">
            <ul className="space-y-4 px-6">
              <li><a href="#profile" className="block hover:underline" onClick={toggleMenu}>Profile</a></li>
              <li><a href="#about" className="block hover:underline" onClick={toggleMenu}>About</a></li>
              <li><a href="#skills" className="block hover:underline" onClick={toggleMenu}>Skills</a></li>
              <li><a href="#projects" className="block hover:underline" onClick={toggleMenu}>Projects</a></li>
              <li><a href="#experience" className="block hover:underline" onClick={toggleMenu}>Experience</a></li>
              <li><a href="#education" className="block hover:underline" onClick={toggleMenu}>Education</a></li>
              <li><a href="#contact" className="block hover:underline" onClick={toggleMenu}>Contact</a></li>
            </ul>
          </nav>
        )}
      </header>

      <main className="container mx-auto px-6 py-16 pt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section id="profile" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Profile</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('profile')} />
          </div>
          {editingSection === 'profile' ? (
            <div className="flex flex-col items-center">
              <div className="relative group mb-4">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <label htmlFor="profilePhoto" className="cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </label>
                  <input
                    type="file"
                    id="profilePhoto"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
              <input
                type="text"
                className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-4"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="flex justify-end space-x-4 mt-2">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                  <Camera className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <h3 className="text-2xl font-semibold">{fullName}</h3>
            </div>
          )}
        </section>

        <section id="about" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('about')} />
          </div>
          {editingSection === 'about' ? (
            <div>
              <textarea
                className="w-full h-32 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-4 mt-2">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <p>{aboutText}</p>
          )}
        </section>

        <section id="skills" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('skills')} />
          </div>
          {editingSection === 'skills' ? (
            <div>
              <textarea
                className="w-full h-32 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
              ></textarea>
              <div className="flex flex-col space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Skill Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Skill Level</label>
                  <select
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Normal">Normal</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <button onClick={handleAddSkill} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  <PlusCircle className="w-4 h-4 inline-block mr-1" /> Add Skill
                </button>
                <div className="flex flex-wrap mt-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-lg m-1 flex items-center space-x-2">
                      <span>{skill.name} - {skill.level}</span>
                      <button onClick={() => handleDeleteSkill(index)} className="text-red-600 hover:text-red-800 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>{skillsText}</p>
              <div className="flex flex-wrap mt-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-lg m-1 flex items-center space-x-2">
                    <span>{skill.name} - {skill.level}</span>
                    <button onClick={() => handleDeleteSkill(index)} className="text-red-600 hover:text-red-800 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="projects" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Projects</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('projects')} />
          </div>
          {editingSection === 'projects' ? (
            <div>
              <div className="flex flex-col space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Description</label>
                  <textarea
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Images</label>
                  <input
                    type="file"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                    onChange={(e) => handleProjectImageChange(e, projects.length)}
                  />
                  <div className="flex flex-wrap mt-2">
                    {newProject.images.map((image, index) => (
                      <img key={index} src={image} alt={`Project ${index}`} className="w-24 h-24 object-cover m-1 rounded-lg" />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Technologies Used</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                    />
                    <button onClick={() => handleAddTechnology(projects.length)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      <PlusCircle className="w-4 h-4 inline-block mr-1" /> Add
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {newProject.technologies.map((tech, index) => (
                      <div key={index} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-lg m-1 flex items-center space-x-2">
                        <span>{tech}</span>
                        <button onClick={() => handleDeleteTechnology(projects.length - 1, index)} className="text-red-600 hover:text-red-800 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Links</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <button onClick={() => handleAddLink(projects.length)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      <LinkIcon className="w-4 h-4 inline-block mr-1" /> Add
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {newProject.links.map((link, index) => (
                      <div key={index} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-lg m-1 flex items-center space-x-2">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">{link}</a>
                        <button onClick={() => handleDeleteLink(projects.length - 1, index)} className="text-red-600 hover:text-red-800 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={handleAddProject} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircle className="w-4 h-4 inline-block mr-1" /> Add Project
              </button>
              <div className="flex justify-end space-x-4 mt-4">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="flex flex-wrap mt-4">
                    {project.images.map((image, imgIndex) => (
                      <img key={imgIndex} src={image} alt={`Project ${imgIndex}`} className="w-24 h-24 object-cover m-1 rounded-lg" />
                    ))}
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-lg m-1 flex items-center space-x-2">
                        <span>{tech}</span>
                        <button onClick={() => handleDeleteTechnology(index, techIndex)} className="text-red-600 hover:text-red-800 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {project.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="bg-gray-700 text-gray-100 px-2 py-1 rounded-lg m-1 flex items-center space-x-2">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">{link}</a>
                        <button onClick={() => handleDeleteLink(index, linkIndex)} className="text-red-600 hover:text-red-800 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => handleDeleteProject(index)} className="text-red-600 hover:text-red-800 transition mt-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="experience" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('experience')} />
          </div>
          {editingSection === 'experience' ? (
            <div>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={exp.current}
                      onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                    />
                    <label>Currently Working Here</label>
                  </div>
                  <button onClick={() => handleDeleteExperience(index)} className="text-red-600 hover:text-red-800 transition mt-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              ))}
              <button onClick={handleAddExperience} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircle className="w-4 h-4 inline-block mr-1" /> Add Experience
              </button>
              <div className="flex justify-end space-x-4 mt-2">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="education" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Education</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('education')} />
          </div>
          {editingSection === 'education' ? (
            <div>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    placeholder="Type of Education (e.g., School, College, Technologist, Course)"
                    value={edu.type}
                    onChange={(e) => handleEducationChange(index, 'type', e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 mb-2"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                  />
                  <button onClick={() => handleDeleteEducation(index)} className="text-red-600 hover:text-red-800 transition mt-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              ))}
              <button onClick={handleAddEducation} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircle className="w-4 h-4 inline-block mr-1" /> Add Education
              </button>
              <div className="flex justify-end space-x-4 mt-2">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{edu.institution}</h3>
                  <p>{edu.type}</p>
                  <p>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="contact" className="mb-16 p-6 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <Edit3 className="w-6 h-6 cursor-pointer" onClick={() => handleEditClick('contact')} />
          </div>
          {editingSection === 'contact' ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <input
                  type="text"
                  className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">GitHub</label>
                <input
                  type="text"
                  className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <input
                  type="text"
                  className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-2">
                <button onClick={handleSaveClick} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  <Save className="w-4 h-4 inline-block mr-1" /> Save
                </button>
                <button onClick={handleCancelClick} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <X className="w-4 h-4 inline-block mr-1" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-6 h-6 text-blue-600" />
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{linkedin}</a>
                </div>
              )}
              {github && (
                <div className="flex items-center space-x-2">
                  <Github className="w-6 h-6 text-gray-600" />
                  <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline">{github}</a>
                </div>
              )}
              {twitter && (
                <div className="flex items-center space-x-2">
                  <Twitter className="w-6 h-6 text-blue-400" />
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">{twitter}</a>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}