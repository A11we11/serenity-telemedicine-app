import type { CreateConsultationInput } from "../validations/consultation.validation";

export class ConsultationService {
  async create(userId: string, data: CreateConsultationInput) {
    return prisma.consultation.create({
      data: {
        patientId: userId,
        chiefComplaint: data.chiefComplaint,
        priority: data.priority,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        intakeData: data.intakeData,
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async getById(id: string, userId: string, userRole: string) {
    const consultation = await prisma.consultation.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },
        photos: {
          orderBy: { takenAt: "desc" },
        },
      },
    });

    if (!consultation) {
      throw new Error("Consultation not found");
    }

    // Authorization check
    if (userRole === "PATIENT" && consultation.patientId !== userId) {
      throw new Error("Unauthorized");
    }

    if (userRole === "DOCTOR" && consultation.doctorId !== userId) {
      throw new Error("Unauthorized");
    }

    return consultation;
  }

  async list(userId: string, userRole: string) {
    const where =
      userRole === "PATIENT" ? { patientId: userId } : { doctorId: userId };

    return prisma.consultation.findMany({
      where,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: any) {
    return prisma.consultation.update({
      where: { id },
      data,
    });
  }
}
